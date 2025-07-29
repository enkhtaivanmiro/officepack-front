import React from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';

export function PhoneNumber(props: PhoneInputProps) {
  return (
    <PhoneInput
      placeholder="Утасны дугаар"
      country="mn"
      containerClass="bg-17 rounded-[14px] border-1 border-[#3F3F3F4C]"
      {...props}
    />
  );
}
