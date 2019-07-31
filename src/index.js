/**
 * Created by v_liukai01 on 2019/7/29.
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'


class App extends Component {
    render() {
        return <div>这是一收发货了</div>
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
