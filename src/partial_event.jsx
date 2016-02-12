// Vendor Libraries
import React, { PropTypes } from 'react'

// Styles
import { partialEventStyles, boxStyles } from './styles'

export default class PartialEvent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
    eventChanged: PropTypes.func.isRequired,
    eventResized: PropTypes.func.isRequired,
    eventClicked: PropTypes.func.isRequired,
    cellWidth: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    styles: PropTypes.object,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    rowHeight: PropTypes.number.isRequired,
    children: PropTypes.node
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { duration, cellWidth } = this.props,
          width = (duration * cellWidth) === 0 ? cellWidth : (duration * cellWidth) - duration - 9

    this.setState({ cellWidth, width, startWidth: width })
  }

  componentWillReceiveProps(nextProps) {
    const { duration, cellWidth } = nextProps,
          width = (duration * cellWidth) === 0 ? cellWidth : duration * cellWidth - duration - 9

    this.setState({ duration, width, startWidth: width })
  }

  render() {
    const { styles, isDragging, connectDragSource, connectDragPreview, id, title, children, rowHeight, ...rest } = this.props,
          { width } = this.state,
          defaultStyles = { color: '#000', backgroundColor: 'darkgrey' },
          eventStyleMerge = Object.assign({ width }, styles || defaultStyles, partialEventStyles),
          boxStyleMerge = Object.assign({ height: '100%', top: '2px', width }, boxStyles)

    return (
      <div className='event-box' style={boxStyleMerge}>
        <div className='event' style={eventStyleMerge}>
          {title}
        </div>
      </div>
    )
  }
}