import React from 'react';
import ErrorCode from '../components/ErrorCode';

const Forbidden = () => <ErrorCode code={403} title='登录过期' message='请重新登录' />;

export default Forbidden;
