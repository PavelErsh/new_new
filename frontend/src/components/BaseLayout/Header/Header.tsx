import { useEffect, useState } from "react";
import Logo from '../../../assets/img/logo.png';
import './styles.css'

export const Header = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [futureTime, setFutureTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const future = new Date(now.getTime() + 2 * 60 * 60 * 1000);

            setCurrentTime(`Текущее время: ${now.toLocaleTimeString('ru-RU', { hour12: false })}`);
            setFutureTime(`Второе время: ${future.toLocaleTimeString('ru-RU', { hour12: false })}`);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);


    
  return (
    <div className="header">
      <a href="/">
        <img src={Logo} className="logo" alt="Логотип" />
      </a>
      <div className="welcome-container">
        <h2 className="welcome-title">Панель управления, КЕНТ</h2>
      </div>

      <a className="welcome-title" href="/customaze">
        <h2 className="welcome-title">Настройки</h2>
      </a>
      <div className="time-container">
        <div className="time" id="current-time">{currentTime}</div>
        <div className="time" id="future-time">{futureTime}</div>
      </div>
    </div>
  );

}