import React, { useState, useEffect } from 'react';
import '../styles/Success.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {Link} from 'react-router-dom';
import { useCallback, useRef} from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };
  
  function getAnimationSettings(originXA, originXB) {
    return {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleCount: 150,
      origin: {
        x: randomInRange(originXA, originXB),
        y: Math.random() - 0.2
      }
    };
  }

const Success = () => {
    const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);
window.onload = () => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
}

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);


  return (
    <>
        <div className="successwrapper">
            <div className="success">
            <p className="icon">
                <span className="material-symbols-outlined">
                    <ShoppingBagIcon fontSize="large"/>
                </span>
            </p>
            <h2>Thank you for your order!</h2>
            <p className="emailmsg">Your order will be delivered in 3-4 business days.</p>
            <p className="description">
                If you have any questions, please email
                <a className="email" href="mailto:pawsitivelypets19@gmail.com">
                pawsitivelypets19@gmail.com
                </a>
            </p>

            <Link to={'/'}>
                <button type="button" className="btn">
                Continue Shopping
                </button>
            </Link>
            </div>
        </div>
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  )
}

export default Success