import proptypes from 'prop-types';

const Content = ({children}) => (
  <main>
    <div>
      {children}
    </div>
  </main>
);

Content.propTypes = {
  children: proptypes.node,
}


export default Content;