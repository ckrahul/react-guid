import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col,
		  Card, CardBody, CardTitle, CardImg

} from 'reactstrap';

const Contents = ({ match, backURL, posts }) => {

	return (
		posts.filter( pContent => `${pContent.title.rendered.replace(/\s+/g, '-').toLowerCase()}` === match.params.topicId)
             .map(pContent =>  
               		(          

						<Card key={pContent.id} className='mt-3 pb-3'>

								{pContent.thegoodartisan_featured_media &&
				                    <CardImg top 
				                    	src={pContent.thegoodartisan_featured_media}
				                        alt={pContent.title.rendered} />
  							}

					        <CardBody>

					          <CardTitle dangerouslySetInnerHTML={{ __html:pContent.title.rendered }} />


					          <div className='card-text' dangerouslySetInnerHTML={{ __html:pContent.content.rendered }} />
				          
			
					          <Link to={backURL} className='btn btn-outline-secondary' role='button' >&#8630; Back to Blog</Link>
					        </CardBody>



						</Card>



			        )
		   		)

		);
}

const Front = ({match, posts}) => console.log('Front match -> ',match) || (
    <Row className='mt-3 pt-3'>

      <h2 className='col-12 mb-3'>Current events</h2>

        {posts.map((post) => (
        	<Col className='col-12' key={post.id}>
				<Card className='mt-3 pb-3'>

						{post.thegoodartisan_featured_media &&
		                    <CardImg top 
		                    	src={post.thegoodartisan_featured_media}
		                        alt={post.title.rendered} />
						}

			        <CardBody>
			        <Link role='button' className='text-secondary' 
						  to={`${match.url}/${post.title.rendered.replace(/\s+/g, '-').toLowerCase()}`} 
						 >
			          	<CardTitle dangerouslySetInnerHTML={{ __html:post.title.rendered }} />
			          </Link> 

			          <div className='card-text' dangerouslySetInnerHTML={{ __html:post.content.rendered }} />
						 <Link className='btn btn-outline-success' 
						 		role='button' 
						 		to={`${match.url}/${post.title.rendered.replace(/\s+/g, '-').toLowerCase()}`} 
						 >Read more &rarr;</Link>                  

			        </CardBody>

				</Card>
			</Col>

        ))}
   
    </Row>
)


class Posts extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		}
	}



	  componentDidMount() {

	  const wp_api_posts = ( 'http://thegoodartisan.localhost/wp-json/wp/v2/posts' );

	    return axios.get(wp_api_posts)
	      .then(response => {
	         const posts = response.data;
	         this.setState({ posts });
	         console.log('posts', posts);
	      });  

	  }



	 render() {
		  return (
		    <Container>
		    	
			      <Route exact path={`${this.props.match.path}`} render={(props) => <Front posts={this.state.posts} {...props} />} />
			      <Route path={`${this.props.match.path}/:topicId`} render={(props) => <Contents posts={this.state.posts} backURL={this.props.match.url} {...props} />} />
		    	
		    </Container>
		  );	 	
	 }	

}

export default Posts;