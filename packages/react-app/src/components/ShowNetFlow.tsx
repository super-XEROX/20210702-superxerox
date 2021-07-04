import React, { useState, useEffect } from "react";
import { FunctionalComponent, h } from 'preact'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import './index.css';

export type Props = {}

export const ReactSpringExample: FunctionalComponent<Props> = ({ ...restProps }) => {
    const [open, toggle] = useState(false)
    const [ref, { width }] = useMeasure()
    const props = useSpring({ width: open ? width : 0 })
  
    return (
      <div className='App'>
        <div ref={ref} className='main' onClick={() => toggle(!open)}>
          <animated.div className='fill' style={props} />
          <animated.div className='content'>{props.width.to(x => x.toFixed(0))}</animated.div>
        </div>
      </div>
    )
  }