import button from './button'
import divider from './divider'

const combineComponents = {
  ...button.components,
  ...divider.components,
}

const componentStyles = {
  components: combineComponents,
}

export default componentStyles
