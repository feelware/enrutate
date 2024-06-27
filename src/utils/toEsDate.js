export default (dateStr) => (
  new Date(Date.parse(dateStr)).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
  })
)