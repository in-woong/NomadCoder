import 'styled-components';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    mainBgColor: string;
    secondBgColor: string;
    textColor: string;
    secondTextColor: string;
  }
}
