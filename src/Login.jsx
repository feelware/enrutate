import {
  TextInput,
  PasswordInput,
  Center,
  Stack,
  Button,
  LoadingOverlay
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'

import useLogin from './store/useLogin'

const Login = () => {
  const { login } = useLogin()
  const [loading, { open, close }] = useDisclosure(false)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', password: '' },
  })

  return (
    <>
      <Center w='100vw' h='100vh'>
        <Stack gap={30} w='22%' miw='300'>
          <form
            onSubmit={form.onSubmit(async (credentials) => {
              open()
              const { error } = await login(credentials)
              close()
              if (!error) {
                return
              }
              if (error.data.code === 400) {
                form.setFieldError('username', 'Usuario o contraseña incorrectos')
                return
              }
              form.setFieldError('username', 'Ha ocurrido un error inesperado')
            })}
          >
            <Stack gap={8}>
              <TextInput
                key={form.key('username')}
                label="Usuario o email"
                placeholder="rodrigo.alva@unmsm.edu.pe"
                required
                {...form.getInputProps('username')}
              />
              <PasswordInput
                key={form.key('password')}
                label="Contraseña"
                placeholder="Tu contraseña"
                required
                {...form.getInputProps('password')}
              />
              <Button
                variant='default' 
                fullWidth
                type='submit'
                mt={10}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </form>
        </Stack>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ 
            blur: 2 
          }} 
        />
      </Center>
    </>
  )
}

export default Login