import 'dayjs/locale/es'
import { ThemeProvider } from '@mui/material/styles'

import Main from './components/Main'
import Menu from './components/Menu'
import Title from './components/Title'
import { useTheme } from './hooks/useTheme'

const App = () => {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Title />
      <Main />
      <Menu />
    </ThemeProvider>
  )
}

export default App
