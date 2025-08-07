import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const KeyFiguresSection = () => {
  const { t } = useTranslation();
  
  return (
  <section style={{
    position: 'relative',
    width: '1440px',
    height: '228px',
    left: 0,
    top: 0, // Parent should control vertical placement
    background: 'transparent',
  }}>
    {/* Divider */}
    <div style={{
      position: 'absolute',
      width: '46.7px',
      height: '1.56px',
      left: '684.97px',
      top: 0,
      background: '#4EBBBD',
    }} />
    {/* Heading */}
    <h2 style={{
      position: 'absolute',
      width: '379px',
      height: '31px',
      left: 'calc(50% - 379px/2 + 0.19px)',
      top: '13.23px',
      fontFamily: 'Cairo, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '25.6865px',
      lineHeight: '31px',
      textTransform: 'uppercase',
      color: '#112033',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      {t('keyFigures.title')}
    </h2>
    {/* Stat 1: 2006 */}
    <div style={{ position: 'absolute', left: '11.68px', top: '75.96px', width: '252.19px', height: '126.49px' }}>
      <div style={{
        position: 'absolute',
        width: '86px',
        height: '58px',
        left: 'calc(50% - 86px/2 + 5.49px)',
        top: '8.04px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 400,
        fontSize: '40px',
        lineHeight: '58px',
        color: '#B99066',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>2006</div>
      <div style={{
        position: 'absolute',
        width: '82.03px',
        height: '17.51px',
        left: 'calc(50% - 82.03px/2 + 0.13px)',
        top: '66.16px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 600,
        fontSize: '11.6757px',
        lineHeight: '18px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>{t('keyFigures.stats.founded')}</div>
    </div>
    {/* Stat 2: 7000 */}
    <div style={{ position: 'absolute', left: '263.87px', top: '75.96px', width: '252.19px', height: '126.49px' }}>
      <div style={{
        position: 'absolute',
        width: '87px',
        height: '58px',
        left: 'calc(50% - 87px/2 + 5.79px)',
        top: '8.04px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 400,
        fontSize: '40px',
        lineHeight: '58px',
        color: '#B99066',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>7000</div>
      <div style={{
        position: 'absolute',
        width: '34.81px',
        height: '17.51px',
        left: 'calc(50% - 34.81px/2 + 0.13px)',
        top: '66.16px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 600,
        fontSize: '11.6757px',
        lineHeight: '18px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>{t('keyFigures.stats.clients')}</div>
    </div>
    {/* Stat 3: 92% */}
    <div style={{ position: 'absolute', left: '516.06px', top: '75.96px', width: '252.19px', height: '126.49px' }}>
      <div style={{
        position: 'absolute',
        width: '97px',
        height: '58px',
        left: 'calc(50% - 97px/2 + 6.6px)',
        top: '8.04px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 400,
        fontSize: '40px',
        lineHeight: '58px',
        color: '#B99066',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>92%</div>
      <div style={{
        position: 'absolute',
        width: '133.57px',
        height: '49.82px',
        left: 'calc(50% - 133.57px/2 + 0.08px)',
        top: '66.94px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 600,
        fontSize: '11.6757px',
        lineHeight: '18px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>{t('keyFigures.stats.recommendation')}</div>
    </div>
    {/* Stat 4: 16 millions */}
    <div style={{ position: 'absolute', left: '768.26px', top: '75.96px', width: '252.19px', height: '126.49px' }}>
      <div style={{
        position: 'absolute',
        width: '182px',
        height: '59px',
        left: 'calc(50% - 182px/2 + 6.9px)',
        top: '8.04px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 400,
        fontSize: '40px',
        lineHeight: '58px',
        color: '#B99066',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>16 millions</div>
      <div style={{
        position: 'absolute',
        width: '96.96px',
        height: '17.51px',
        left: 'calc(50% - 96.96px/2 + 0.15px)',
        top: '66.16px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 600,
        fontSize: '11.6757px',
        lineHeight: '18px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>{t('keyFigures.stats.revenue')}</div>
    </div>
    {/* Stat 5: +18 % */}
    <div style={{ position: 'absolute', left: '1020.45px', top: '75.96px', width: '252.19px', height: '126.49px' }}>
      <div style={{
        position: 'absolute',
        width: '110px',
        height: '58px',
        left: 'calc(50% - 110px/2 + 7.71px)',
        top: '8.04px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 400,
        fontSize: '40px',
        lineHeight: '58px',
        color: '#B99066',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>+18 %</div>
      <div style={{
        position: 'absolute',
        width: '109.65px',
        height: '17.51px',
        left: 'calc(50% - 109.65px/2 + 0.12px)',
        top: '66.16px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 600,
        fontSize: '11.6757px',
        lineHeight: '18px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>{t('keyFigures.stats.growth')}</div>
    </div>
    {/* Stat 6: 150 */}
    <div style={{ position: 'absolute', left: '1272.65px', top: '75.96px', width: '155.67px', height: '126.49px' }}>
      <div style={{
        position: 'absolute',
        width: '64px',
        height: '58px',
        left: 'calc(50% - 64px/2 + 4.51px)',
        top: '8.04px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 400,
        fontSize: '40px',
        lineHeight: '58px',
        color: '#B99066',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>150</div>
      <div style={{
        position: 'absolute',
        width: '129.38px',
        height: '32.3px',
        left: 'calc(50% - 129.38px/2 + 0.07px)',
        top: '66.94px',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontWeight: 600,
        fontSize: '11.6757px',
        lineHeight: '18px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>{t('keyFigures.stats.employees')}</div>
    </div>
  </section>
);
};

export default KeyFiguresSection; 