import ErrorCode from '../components/ErrorCode';

const NotFound = () => <ErrorCode code={404} title='没有发现' message='抱歉，你请求的页面并不存在' />;

export default NotFound;
