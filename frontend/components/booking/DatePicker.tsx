'use client';

import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  disabled?: Date[];
  minDate?: Date;
  maxDate?: Date;
  error?: string;
  label?: string;
  helperText?: string;
  required?: boolean;
}

/**
 * DatePicker Component
 * Enhanced date picker with availability checking
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onSelect,
  disabled = [],
  minDate,
  maxDate,
  error,
  label = 'Event Datum',
  helperText,
  required = false,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const defaultMinDate = minDate || today;
  const defaultMaxDate = maxDate || new Date(today.getFullYear() + 2, 11, 31);

  // Create disabled matcher function
  const disabledMatcher = (date: Date) => {
    // Disable dates before min date
    if (date < defaultMinDate) return true;

    // Disable dates after max date
    if (date > defaultMaxDate) return true;

    // Disable specific dates
    return disabled.some((disabledDate) => {
      return (
        date.getFullYear() === disabledDate.getFullYear() &&
        date.getMonth() === disabledDate.getMonth() &&
        date.getDate() === disabledDate.getDate()
      );
    });
  };

  return (
    <div className={styles.datePickerContainer}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      {helperText && <p className={styles.helperText}>{helperText}</p>}

      <div className={`${styles.pickerWrapper} ${error ? styles.error : ''}`}>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={disabledMatcher}
          modifiersClassNames={{
            selected: styles.selected,
            today: styles.today,
            disabled: styles.disabled,
          }}
          classNames={{
            root: styles.picker,
            months: styles.months,
            month: styles.month,
            caption: styles.caption,
            caption_label: styles.captionLabel,
            nav: styles.nav,
            nav_button: styles.navButton,
            nav_button_previous: styles.navButtonPrevious,
            nav_button_next: styles.navButtonNext,
            table: styles.table,
            head_row: styles.headRow,
            head_cell: styles.headCell,
            row: styles.row,
            cell: styles.cell,
            day: styles.day,
          }}
          weekStartsOn={1}
          locale={undefined}
          formatters={{
            formatCaption: (date) => {
              return new Intl.DateTimeFormat('nl-NL', {
                month: 'long',
                year: 'numeric',
              }).format(date);
            },
            formatWeekdayName: (date) => {
              return new Intl.DateTimeFormat('nl-NL', {
                weekday: 'short',
              }).format(date);
            },
          }}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      {selected && (
        <div className={styles.selectedDateInfo}>
          <p className={styles.selectedDateText}>
            Geselecteerde datum:{' '}
            <strong>
              {new Intl.DateTimeFormat('nl-NL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(selected)}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
