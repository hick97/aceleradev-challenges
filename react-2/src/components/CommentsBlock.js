import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commentsService from "../services/commentsService";
import { withRouter } from "react-router-dom";
import { isLogged, getUser } from "../services/loginService";

class CommentsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      comment: ""
    };
  }

  componentWillMount() {
    try {
      const { recipeSlug } = this.props.match.params;
      const c = commentsService.get(recipeSlug);

      this.setState({
        comments: c
      });
    } catch (err) {
      alert(err);
    }
  }
  handleCommentDelete = target => {
    try {
      const { recipeSlug } = this.props.match.params;
      commentsService.delete(recipeSlug, target);
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  renderComment = (comment, key, allowDelete) => (
    <div key={key} className="Comment media text-muted pt-3">
      <FontAwesomeIcon className="mr-2" size="3x" icon="user-circle" />
      <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark">{comment.author}</strong>
        {comment.comment}
      </p>
      {/* Icone deve aparecer somente quando o comentario for do usuario logado */}
      {allowDelete ? (
        <FontAwesomeIcon
          icon="trash"
          onClick={() => this.handleCommentDelete(comment)}
        />
      ) : null}
    </div>
  );
  handleInputChange = value => {
    this.setState({
      comment: value
    });
  };
  handleSubmit = e => {
    const { recipeSlug } = this.props.match.params;
    commentsService.insert(recipeSlug, this.state.comment);
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="text-left">
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">Comments</h6>
          {comments.map((c, index) =>
            isLogged()
              ? this.renderComment(
                  c,
                  (c.key = index),
                  getUser().username === c.author
                )
              : this.renderComment(c, (c.key = index), false)
          )}
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Comment</label>
            <textarea
              disabled={isLogged() ? false : true}
              value={this.state.comment}
              onChange={e => this.handleInputChange(e.target.value)}
              required="required"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Insert your comment here"
            />
          </div>
          <button
            onClick={this.handleSubmit}
            disabled={isLogged() ? false : true}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(CommentsBlock);
