import React from "react";
import { compose, setDisplayName, withHandlers } from "recompose";
import { Form, Input, Row, Col, Button } from "antd";
import styles from "./style.less";
import AV from '../../shared/av';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export default compose(
  setDisplayName(__filename),
  Form.create({ name: "register" }),
  withHandlers({
    handleSubmit: ({ form: { getFieldValue } }) => e => {
      e.preventDefault();
      e.stopPropagation();
      const name = getFieldValue('nickname');
      const phone = getFieldValue('phone');
      const password = getFieldValue('password');
    
      
      var user = new AV.User();
      // 设置用户名
      user.setUsername(name);
      user.setMobilePhoneNumber(phone);
      // 设置密码
      user.setPassword(password);
      
      user.signUp().then(
        function(loggedInUser) {
          console.log(loggedInUser);
        },
        function(error) {}
      );
    }
  })
)(
  ({
    form: { getFieldDecorator },
    handleSubmit,
    validateToNextPassword,
    compareToFirstPassword,
    handleConfirmBlur
  }) => (
    <div className={styles.Register}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="手机号">
          {getFieldDecorator("phone", {
            rules: [{ required: true, message: "请输入手机号！" }]
          })(<Input style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label={"昵称"}>
          {getFieldDecorator("nickname", {
            rules: [
              {
                required: true,
                message: "请输入昵称!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入密码!"
              },
              {
                validator: validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "请再次输入密码!"
              },
              {
                validator: compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
);
