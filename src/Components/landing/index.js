import React from 'react';
import Sidebar from './api-feed/index';
import ArticleFeed from './article-feed/index';

class Landing extends React.Component {
    render(){
        return(
            <main>
                <section className='landing'>
                    {/* <div className='base-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='base-article-feed'>
                        <ArticleFeed />
                    </div> */}
                    <Sidebar />
                    <ArticleFeed />
                </section>
            </main>
        )
    }
}

export default Landing