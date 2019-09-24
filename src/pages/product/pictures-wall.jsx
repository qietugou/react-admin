import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd'
import { reqDeleteImg } from '../../api'
/*
用于图片上传的组件
 */
export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false, // 标识是否显示大图预览Modal
    previewImage: '', // 大图的url
    fileList: [
      /*{
        uid: '-1', // 每个file都有自己唯一的id
        name: 'xxx.png', // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
      },*/
    ]
  }

  constructor(props) {
    super(props)

    let fileList = []

    // 如果传入了imgs属性
    const { imgs } = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: img, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: img
      }))
    }

    // 初始化状态
    this.state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList // 所有已上传图片的数组
    }
  }

  /*
  获取所有已上传图片文件名的数组
   */
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  /*
  隐藏Modal
   */
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    console.log('handlePreview()', file)
    // 显示指定file对应的大图
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  /*
  file: 当前操作的图片文件(上传/删除)
  fileList: 所有已上传图片文件对象的数组
   */
  handleChange = async ({ file, fileList }) => {
    console.log(file, fileList
    )

    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if  (file.status === 'removed') {
      // 删除图片
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('删除图片成功!')
      } else {
        message.error('删除图片失败!')
      }
    }
    

  }
  handleCustomRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials
  }) => {
    const formData = new FormData()
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    const url = window.URL || window.webkitURL
    let src = url.createObjectURL(file)
  
    const response = {
      uid: src,
      name: src,
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: src,
    }
    // this.handleChange(response)
    this.setState({
      fileList: [...this.state.fileList, { ...response }]
    })
  }
  handleRemove = (file) => {
     // 删除图片
     console.log(file)
     const fileList = this.state.fileList.filter((item) => {
        return item.uid !== file.uid
     })
     this.setState({
      fileList
     })
     return true
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>上传图片</div>
      </div>
    )
    return (
      <div>
        <Upload
          action="/manage/img/upload" /*上传图片的接口地址*/
          accept="image/*" /*只接收图片格式*/
          name="image" /*请求参数名*/
          listType="picture-card" /*卡片样式*/
          customRequest={this.handleCustomRequest}
          fileList={fileList} /*所有已上传图片文件对象的数组*/
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}

        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
