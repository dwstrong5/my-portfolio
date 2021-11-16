import { render } from '@testing-library/react';
import React from 'react';
import Hero from '../components/Hero';
import Content from '../components/Content';

function AboutPage(props) {
     
    return (
        <div class="align-items-center mb-3 mb-sm-5">
            <Hero title={props.title} />

            

            <Content>
                
                <p className = "" > Welcome! My name is Don (others sometimes refer to me by the name 'Donnie') and my hope 
                is that this website will serve as a space to showcase who I am as a person and as a developer. I started developing
                this website as a way to learn React by getting my hands dirty, and mid-way through I realized that it has so much
                more potential. An important fact to know about me, I love learning. More importantly, I love jumping in head first
                and learn by doing. This may not be the most efficient way of learning for some, but it certainly is for me.
                </p>
                

                <h3>Education</h3>
                <p>As an undergraduate, I focused primarily on algorithm analysis, data structures, operating system internals,


                </p>
            </Content>
        </div>



    );

}

export default AboutPage;