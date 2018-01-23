import React from 'react'
import { Form, Input } from 'antd';
const FormItem = Form.Item;

class CreateButtonForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form layout="vertical">
        <FormItem
          {...formItemLayout}
          label="Mesage">
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input a message.' }],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    );
  }
}

export const WrappedCreatePostForm = Form.create()(CreateButtonForm);