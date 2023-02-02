import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hourSelector, minuteState } from './atoms';

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMinutes(Number(e.currentTarget.value));
  };

  const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
    setHours(Number(e.currentTarget.value));
  };

  return (
    <div className='App'>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type='number'
        placeholder='Minutes'
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type='number'
        placeholder='Hours'
      />
    </div>
  );
}

export default App;
