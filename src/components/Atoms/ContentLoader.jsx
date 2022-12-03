

import React from 'react'
import ContentLoader from 'react-content-loader'

const ImageGrid = props => (
  <ContentLoader
    width={1600}
    height={575}
    viewBox="0 0 1600 575"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    
    <rect x="0" y="0" rx="0" ry="0" width="306" height="409" />
    <rect x="350" y="0" rx="2" ry="2" width="306" height="409" />
    <rect x="700" y="0" rx="2" ry="2" width="306" height="409" />
    <rect x="1050" y="0" rx="2" ry="2" width="306" height="409" />

  </ContentLoader>
)

ImageGrid.metadata = {
  name: 'Hassan Tijani.A',
  github: 'surepeps',
  description: 'Image Grid with Pagination',
  filename: 'ImageGrid',
}

export default ImageGrid