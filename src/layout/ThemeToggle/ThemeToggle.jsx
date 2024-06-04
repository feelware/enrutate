import { 
  SegmentedControl, 
  useMantineColorScheme,
  Center,
  rem
} from "@mantine/core"
import {
  IconSun,
  IconMoon,
} from '@tabler/icons-react';

const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  
  return (
    <SegmentedControl
      data={[
        { value: 'light', label: (
          <Center>
            <IconSun
              style={{ width: rem(20), height: rem(20) }}
            />
          </Center>
        ) },
        { value: 'dark', label: (
          <Center>
            <IconMoon
              style={{ width: rem(20), height: rem(20) }}
            />
          </Center>
        ) },
      ]}
      value={colorScheme}
      onChange={setColorScheme}
    />
  )
}

export default ThemeToggle