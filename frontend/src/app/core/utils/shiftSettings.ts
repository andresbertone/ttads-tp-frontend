export class ShiftSettings {
    public static STAND_BY_SHIFT = 'Stand by';
    public static ENTERED_SHIFT = 'Entered';
    public static CANCELLED_SHIFT = 'Cancelled';

    public static DEFAULT_COLOR = 'white';
    public static COLORS: any = {
      'Stand by': 'white',
      'Entered': 'green',
      'Cancelled': 'red'
    }

    public static MAX_SHIFTS_PER_DAY = 3;
}