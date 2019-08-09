import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col,
		  Card, CardBody, CardTitle, CardImg

} from 'reactstrap';

class Blog extends React.Component {
 constructor() {
 	super();

 	this.state = {
 		posts: []
 	}
 }

  componentDidMount() {

  const wp_api_posts = ( 'https://thegoodartisan.com/wp-json/wp/v2/posts' );

    return axios.get(wp_api_posts)
      .then(response => {
         const posts = response.data;
         this.setState({ posts });
         console.log('posts', posts);
      });  

  }

	render() {
		return (
			<Container className='border border-secondary'>
				<Row>
					<Col className='col-12'>

			   				{
			  					this.state.posts.map((post, index) => {
			  						return (
			  							<Card key={index} className='mt-3 pb-3'>

			  									{post.thegoodartisan_featured_media &&
			  					                    <CardImg top 
			  					                    	src={post.thegoodartisan_featured_media}
			  					                        alt={post.title.rendered} />
			          							}

			  						        <CardBody>

			  						          <CardTitle dangerouslySetInnerHTML={{ __html:post.title.rendered }} />


			  						          <div className='card-text' dangerouslySetInnerHTML={{ __html:post.content.rendered }} />

			  						          <a href={`/${post.title.rendered.replace(/\s+/g, '-').toLowerCase()}`} className='btn btn-outline-primary' role='button'>Read more... </a>
			  				

			  						        </CardBody>



			  							</Card>
			  							)

			  						})
			  				}

					</Col>
				</Row>
			</Container>
		);
	}
}

export default Blog;
