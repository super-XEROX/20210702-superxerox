import React, { useState, useEffect } from "react";
import { FunctionalComponent, h } from 'preact'
import { animated, useSpring } from 'react-spring'

export type Props = {}

export const ReactSpringExample: FunctionalComponent<Props> = ({ ...restProps }) => {
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    })

    return <animated.h1 style={props}>hello</animated.h1>
}