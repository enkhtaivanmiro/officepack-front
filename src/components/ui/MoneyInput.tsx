'use client';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// @ts-ignore
interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
  onChange?: (value: string) => void;
}

export const MoneyInput = ({ className, value, onChange, suffix, ...props }: MoneyInputProps) => {
  const format = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '’');
  };

  const parse = (val: string) => val.replace(/[^0-9]/g, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parse(e.target.value);
    onChange?.(raw);
  };

  return (
    <div className={cn('relative')}>
      <Input
        {...props}
        value={format(`${value || ''}`)}
        onChange={handleChange}
        inputMode="numeric"
        autoComplete="off"
        className={cn(className, { ['pr-16']: !!suffix })}
      />
      {suffix && <span className="absolute top-1/2 right-3 -translate-y-1/2">{suffix}</span>}
    </div>
  );
};
