// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;
import {
    ISuperfluid,
    ISuperToken,
    ISuperApp,
    ISuperAgreement,
    SuperAppDefinitions
} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
// When you're ready to leave Remix, change imports to follow this pattern:
// "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {
    IConstantFlowAgreementV1
} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {
    SuperAppBase
} from "https://github.com/superfluid-finance/protocol-monorepo/blob/remix-support-soda-machine/packages/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import { Simple777Recipient } from "./Simple777Recipient.sol";
contract SuperXerox is Simple777Recipient, SuperAppBase {
    ISuperfluid private _host; // host
    IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
    ISuperToken private _acceptedToken; // accepted token
    address private _receiver;
    ISuperToken private _copyToken;
    constructor(
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken,
        ISuperToken copyToken
        ) 
        Simple777Recipient(address(copyToken))
        {
        assert(address(host) != address(0));
        assert(address(cfa) != address(0));
        assert(address(acceptedToken) != address(0));
        assert(address(copyToken) != address(0));
        _host = host;
        _cfa = cfa;
        _acceptedToken = acceptedToken;
        _copyToken = copyToken;
        uint256 configWord =
            SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;
        _host.registerApp(configWord);
    }
    /**************************************************************************
     * SatisfyFlows Logic
     *************************************************************************/
    /// @dev If a new stream is opened, or an existing one is opened
    function _updateOutflow(bytes calldata ctx, address customer, bytes32 agreementId)
        private
        returns (bytes memory newCtx)
    {
      newCtx = ctx;
      (,int96 inFlowRate,,) = _cfa.getFlowByID(_acceptedToken, agreementId);
      (,int96 outFlowRate,,) = _cfa.getFlow(_copyToken, address(this), customer);
      if (inFlowRate < 0 ) inFlowRate = -inFlowRate; // Fixes issue when inFlowRate is negative

      if (outFlowRate != int96(0)){
        // @dev if there already exists an outflow, then update it.
        (newCtx, ) = _host.callAgreementWithContext(
            _cfa,
            abi.encodeWithSelector(
                _cfa.updateFlow.selector,
                _copyToken,
                customer,
                inFlowRate,
                new bytes(0) // placeholder
            ),
            "0x",
            newCtx
        );
      } else if (inFlowRate == int96(0)) {
          // @dev if inFlowRate is zero, delete outflow.
          (newCtx, ) = _host.callAgreementWithContext(
              _cfa,
              abi.encodeWithSelector(
                  _cfa.deleteFlow.selector,
                  _copyToken,
                  address(this),
                  customer,
                  new bytes(0) // placeholder
              ),
              "0x",
              newCtx
          );
      } else {
          // @dev If there is no existing outflow, then create new flow to equal inflow
          (newCtx, ) = _host.callAgreementWithContext(
              _cfa,
              abi.encodeWithSelector(
                  _cfa.createFlow.selector,
                  _copyToken,
                  customer,
                  inFlowRate,
                  new bytes(0) // placeholder
              ),
              "0x",
              newCtx
          );
      }
    }
    /**************************************************************************
     * SuperApp callbacks
     *************************************************************************/
    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32 _agreementId,
        bytes calldata /*_agreementData*/,
        bytes calldata ,// _cbdata,
        bytes calldata _ctx
    )
        external override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        address customer = _host.decodeCtx(_ctx).msgSender;
        return _updateOutflow(_ctx, customer, _agreementId);
    }
    function afterAgreementUpdated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32 _agreementId,
        bytes calldata /*_agreementData*/,
        bytes calldata ,//_cbdata,
        bytes calldata _ctx
    )
        external override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        address customer = _host.decodeCtx(_ctx).msgSender;
        return _updateOutflow(_ctx, customer, _agreementId);
    }
    function afterAgreementTerminated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32 _agreementId,
        bytes calldata _agreementData,
        bytes calldata ,//_cbdata,
        bytes calldata _ctx
    )
        external override
        onlyHost
        returns (bytes memory newCtx)
    {
        // According to the app basic law, we should never revert in a termination callback
        if (!_isSameToken(_superToken) || !_isCFAv1(_agreementClass)) return _ctx;
        (address customer,) = abi.decode(_agreementData, (address, address));
        return _updateOutflow(_ctx, customer, _agreementId);
    }
    function getNetFlow() public view returns (int96) {
       return _cfa.getNetFlow(_acceptedToken, address(this));
    }
    function _isSameToken(ISuperToken superToken) private view returns (bool) {
        return address(superToken) == address(_acceptedToken);
    }
    function _isCFAv1(address agreementClass) private view returns (bool) {
        return ISuperAgreement(agreementClass).agreementType()
            == keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1");
    }
    modifier onlyHost() {
        require(msg.sender == address(_host), "SatisfyFlows: support only one host");
        _;
    }
    modifier onlyExpected(ISuperToken superToken, address agreementClass) {
        require(_isSameToken(superToken), "SatisfyFlows: not accepted token");
        require(_isCFAv1(agreementClass), "SatisfyFlows: only CFAv1 supported");
        _;
    }
}
