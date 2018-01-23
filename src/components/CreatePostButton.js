import React from 'react'
import { Modal, Button } from 'antd'
import { WrappedCreatePostForm } from './CreateButtonForm'

export class CreatePostButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create New Posts</Button>
        <Modal title="Create New Posts"
               visible={visible}
               onOk={this.handleOk}
               okText="Create"
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               cancelText="Cancel"
        >
          <WrappedCreatePostForm ref={this.saveFormRef}/>
        </Modal>
      </div>
    );
  }
}