import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hourSelector, minuteState } from './atom';

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = ({
    currentTarget: { value: minutes },
  }: React.FormEvent<HTMLInputElement>) => {
    setMinutes(Number(minutes));
  };
  const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
    setHours(Number(e.currentTarget.value));
  };
  return (
    <div>
      <input
        value={hours}
        onChange={onHoursChange}
        type='number'
        placeholder='Hours'
      />
      <input
        type='number'
        placeholder='Minutes'
        value={minutes}
        onChange={onMinutesChange}
      />
    </div>
  );
}

export default App;
