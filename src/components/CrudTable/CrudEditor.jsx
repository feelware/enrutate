import {
  TextInput,
  NumberInput,
  Stack,
  Checkbox,
  Group,
  Button,
} from '@mantine/core'

import { 
  useForm,
  isNotEmpty 
} from '@mantine/form'

const CrudEditor = ({ 
  attributes,
  entry,
  onSubmit,
  close 
}) => {
  const initialValues = { ...attributes }
  const validate = {}

  Object.keys(initialValues).forEach(key => {
    initialValues[key] = entry ? attributes[key].selector(entry) : ''
    if (attributes[key].required) {
      validate[key] = isNotEmpty('Campo requerido')
    }
    if (attributes[key].validate) {
      validate[key] = validate[key] && attributes[key].validate
    }
  })

  const form = useForm({ initialValues, validate })

  console.log(validate)

  return (
    <form onSubmit={form.onSubmit(async (values) => {
      await onSubmit({ ...entry, ...values })
      close()
    })}>
      <Stack>
        <Stack gap={7}>
        {
          Object.entries(attributes).map(([key, attribute]) => {
            const type = attribute.type 
              || typeof attribute.selector(entry)
              || typeof attribute.placeholder
              || 'string'
            switch (type) {
              case 'number':
                return (
                  <NumberInput
                    key={form.key(key)}
                    label={attribute.label}
                    placeholder={attribute.placeholder}
                    withAsterisk={attribute.required}
                    {...form.getInputProps(key)}
                  />
                )
              case 'boolean':
                return (
                  <Checkbox
                    key={form.key(key)}
                    label={attribute.label}
                    withAsterisk={attribute.required}
                    {...form.getInputProps(key)}
                  />
                )
              case 'string':
                return (
                  <TextInput
                    key={form.key(key)}
                    label={attribute.label}
                    placeholder={attribute.placeholder}
                    withAsterisk={attribute.required}
                    {...form.getInputProps(key)}
                  />
                )
              default:
                return null
            }
          })
        }
        </Stack>
        <Group grow>
          <Button
            variant='default'
            onClick={close}
          >
            Cancelar
          </Button>
          <Button 
            type='submit'
            disabled={!form.isDirty()}
          >
            Guardar
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

export default CrudEditor