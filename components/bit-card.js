import PropTypes from 'prop-types'
import Link from 'next/link'

import classNames from 'classnames'

import TimeAgo from 'timeago-react'

import * as linkify from 'linkifyjs'
import hashtag from 'linkifyjs/plugins/hashtag'
import mention from 'linkifyjs/plugins/mention'
import Linkify from 'linkifyjs/react'
hashtag(linkify)
mention(linkify)

import '../styles/styles.sass'

const LinkifyLink = props => (
	<Link href={props.href}>
		<a>{props.children}</a>
	</Link>
)

LinkifyLink.propTypes = {
	href: PropTypes.string,
	children: PropTypes.any,
}

const BitCard = props => (
	<Link href={`/bit/${props.bitID}`}>
		<div className={classNames('box', {'not-expanding': props.notExpanding})} style={{
			width: props.fixedWidth ? `${props.fixedWidth}px` : 'auto',
			height: props.fixedHeight ? `${props.fixedHeight}px` : 'auto',
		}}>
			<Link href={`/u/${props.handle}`}>
				<h4 className="title is-5 bit-header" style={{ marginBottom: '6px', cursor: 'pointer' }}>
					<span>{props.displayName}</span>
					{props.verified || props.botUser ? ' ' : ''}
					{props.verified ? <i className="fas fa-check-circle verified-check-small" title="verified."></i> : ''}
					{props.botUser ? <i className="fas fa-robot verified-check-small" title="this account is controlled by a robot."></i> : ''}
					&emsp;
					<span className="handle">@{props.handle}</span>
				</h4>
			</Link>
			<p className="bit-text">
				<Linkify options={{
					formatHref: {
						hashtag: (val) => '/t/' + val.substr(1),
						mention: (val) => '/u' + val,
					},
					validate: {
						email: false,
						url: props.verified,
					},
					tagName: () => LinkifyLink,
				}}>{props.text}</Linkify>
			</p>
			<p className="bit-date">
				<TimeAgo datetime={props.date} />
			</p>
			<div className={classNames('columns', 'interacts', 'is-mobile', { 'is-hidden': props.hideBottomStats })}>
				<div className="column is-3">
					<i className="far fa-comment-alt"></i>&nbsp;&nbsp;<span className="interacts-label">{props.numReplies || 0}</span>
				</div>
				<div className="column is-3">
					<i className="far fa-heart"></i>&nbsp;&nbsp;<span className="interacts-label">{props.numHearts || 0}</span>
				</div>
			</div>
			<style jsx>{`
				.not-expanding {
					margin: 1rem auto;
					max-width: 600px;
				}
				.bit-header {
					font-size: 18px;
					user-select: none;
				}
				.bit-header:hover {
					color: #505050;
				}
				.handle {
					font-weight: 400;
					user-select: none;
				}
				.bit-text {
					font-weight: 500;
					font-size: 18px;
					line-height: 24px;
					margin-bottom: 6px;
					overflow-wrap: break-word;
				}
				.bit-date {
					font-weight: 500;
					font-size: 13px;
					line-height: 17px;
					color: #5D5D5D;
					margin-bottom: 6px;
				}
				.interacts {
					font-size: 13px;
				}
				.interacts-label {
					font-size: 15px;
				}
				.verified-check-small {
					font-size: 13px;
					user-select: none;
				}
				.box:hover {
					background: #fbfbfb;
					cursor: pointer;
				}
		`}</style>
		</div>
	</Link>
)

BitCard.propTypes = {
	notExpanding: PropTypes.bool,
	displayName: PropTypes.string.isRequired,
	verified: PropTypes.bool,
	botUser: PropTypes.bool,
	handle: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	numReplies: PropTypes.number,
	numHearts: PropTypes.number,
	bitID: PropTypes.string.isRequired,
	fixedWidth: PropTypes.number,
	fixedHeight: PropTypes.number,
	hideBottomStats: PropTypes.bool,
	mentions: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		mentionText: PropTypes.string,
	})),
	tags: PropTypes.arrayOf(PropTypes.string),
}

export default BitCard