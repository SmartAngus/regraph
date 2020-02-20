import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import DocumentTitle from 'react-document-title';

class Details extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    pageData: PropTypes.object,
  };

  static defaultProps = {
    className: 'examples-details',
  };

  constructor (props) {
    super(props);
    this.state = {
      replay: false,
    };
  }

  shouldComponentUpdate () {
    return this.state.replay;
  }

  onClick = () => {
    this.setState({
      replay: true,
    }, () => {
      this.setState({
        replay: false,
      });
    });
  };

  render () {
    const props = this.props;
    const {pageData, themeConfig} = this.props;
    const className = this.props.className;
    const {
      meta, content, description,
      style, preview, highlightedCode, highlightedStyle,
    } = pageData;
    const {
      title, subtitle, chinese, english,
    } = meta;
    return (<DocumentTitle title={`${subtitle || chinese || ''} ${title || english} - ${themeConfig.title}`}>
      <div className="page">
        <TweenOne animation={{y: 30, opacity: 0, type: 'from'}} className="page-wrapper">
          <article className={`markdown ${className}`}>
            <div className={`${className}-demo`}>
              {!this.state.replay && preview(React, ReactDOM)}
            </div>
            <div className="replay-button">
              <i onClick={this.onClick}/>
            </div>
            <h1>
              {title || english}
              {(!subtitle && !chinese) ? null : (<i>{subtitle || chinese}</i>)}
            </h1>
            {props.utils.toReactComponent(description)}
            {!!content.length && props.utils.toReactComponent(['section'].concat(content))}
            <h2>代码片段</h2>
            {!!style && <style dangerouslySetInnerHTML={{__html: style}}/>}
            <h3>jsx</h3>
            {!!highlightedCode.length && props.utils.toReactComponent(highlightedCode)}
            {highlightedStyle && <h3>css</h3>}
            {highlightedStyle && (<pre className="css">
              <code dangerouslySetInnerHTML={{__html: highlightedStyle}}/>
            </pre>)}
          </article>
        </TweenOne>
      </div>
    </DocumentTitle>);
  }
}

export default Details
