import React, { Component } from 'react';
import './Hint.css';

class Hint extends Component {
  constructor() {
    super();
    this.state = {
      token: ""
    }
  }

  onChangeToken = (event) => {
    this.setState({ token: event.target.value });
  }

  componentDidMount() {
    const { submitToken, hintNumber } = this.props;
    let elem = document.querySelector(`#modalHint${hintNumber} input[type='text']`);
    elem.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
          submitToken(hintNumber, elem.value);
      }
    });
  }

  render() {
    const { submitToken, hintNumber, hintCount } = this.props;
    return (
      <div>
        <div className="hint-name">{`Hint ${hintCount}:`}</div>
        <div id={`hint-desc-${hintNumber}`} className="hint-box" data-toggle="modal" data-target={`#modalHint${hintNumber}`}>
          Hiddent Content. Tap to show!
        </div>
  
        <div className="modal fade" id={`modalHint${hintNumber}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Unlock Hint</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input className="form-control" type="text" placeholder="Enter Token"
                  onChange={this.onChangeToken}
                ></input>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary"
                  onClick={() => {submitToken(hintNumber, this.state.token);}}
                >Unlock</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hint;