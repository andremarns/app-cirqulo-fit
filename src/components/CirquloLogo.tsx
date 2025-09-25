import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div<{ size?: number; theme?: 'light' | 'dark' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${props => props.size || 60}px;
  height: ${props => props.size || 60}px;
`;

const CircleBase = styled.div<{ size: number; color: string }>`
  position: absolute;
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled.div<{ size: number; color: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.color};
  position: relative;
  overflow: hidden;
`;

const GradientOverlay = styled.div<{ size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(0, 0, 0, 0.1) 100%
  );
  border-radius: 50%;
`;

const PulseRing = styled.div<{ size: number; delay: number }>`
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(76, 175, 80, 0.6);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: pulse 2s infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;

const Icon = styled.div<{ size: number }>`
  font-size: ${props => props.size * 0.4}px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  position: relative;
`;

interface CirquloLogoProps {
  size?: number;
  showPulse?: boolean;
  variant?: 'fit' | 'default';
}

export const CirquloLogo: React.FC<CirquloLogoProps> = ({ 
  size = 60, 
  showPulse = false, 
  variant = 'default' 
}) => {
  const getGradient = () => {
    if (variant === 'fit') {
      return 'linear-gradient(135deg, #4CAF50 0%, #2196F3 50%, #FF9800 100%)';
    }
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  const getIcon = () => {
    if (variant === 'fit') {
      return '💪';
    }
    return '⚡';
  };

  return (
    <LogoContainer size={size}>
      {/* Anéis de pulso animados */}
      {showPulse && (
        <>
          <PulseRing size={size * 1.1} delay={0} />
          <PulseRing size={size * 1.2} delay={0.5} />
          <PulseRing size={size * 1.3} delay={1} />
        </>
      )}
      
      {/* Círculo base */}
      <CircleBase size={size} color={getGradient()}>
        <InnerCircle size={size * 0.8} color="rgba(255, 255, 255, 0.1)">
          <GradientOverlay size={size * 0.8} />
          <Icon size={size}>
            {getIcon()}
          </Icon>
        </InnerCircle>
      </CircleBase>
    </LogoContainer>
  );
};

// Logo com texto
const LogoWithTextContainer = styled.div<{ theme?: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoText = styled.div<{ theme?: 'light' | 'dark' }>`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.h1<{ theme?: 'light' | 'dark' }>`
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const SubText = styled.p<{ theme?: 'light' | 'dark' }>`
  font-size: 0.8rem;
  margin: 0;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

interface CirquloLogoWithTextProps {
  size?: number;
  showPulse?: boolean;
  variant?: 'fit' | 'default';
  theme?: 'light' | 'dark';
}

export const CirquloLogoWithText: React.FC<CirquloLogoWithTextProps> = ({ 
  size = 60, 
  showPulse = false, 
  variant = 'default',
  theme = 'light'
}) => {
  const getAppName = () => {
    if (variant === 'fit') {
      return 'CirquloFit';
    }
    return 'Cirqulo';
  };

  const getAppDescription = () => {
    if (variant === 'fit') {
      return 'Fitness App';
    }
    return 'Ecosystem';
  };

  return (
    <LogoWithTextContainer theme={theme}>
      <CirquloLogo size={size} showPulse={showPulse} variant={variant} />
      <LogoText theme={theme}>
        <MainText theme={theme}>{getAppName()}</MainText>
        <SubText theme={theme}>{getAppDescription()}</SubText>
      </LogoText>
    </LogoWithTextContainer>
  );
};
