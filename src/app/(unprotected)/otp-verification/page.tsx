import FooterLandingPage from '@/components/LandingPage/FooterLandingPage';
import Header from '@/components/LandingPage/Header';
import OTPVerification from '@/components/OtpVerification';
import React from 'react'

const OtpVerificationPage = () => {
  return (
    <div> 
        <Header />
        <OTPVerification  />
        <FooterLandingPage />
        </div>
  )
}

export default OtpVerificationPage;