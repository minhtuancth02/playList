import React from 'react'
import useActiveSection from '../useActiveSection';
import './styles.css'

export default function BlogPost({ children }) {
    
    const childArray = React.Children.toArray(children);
    const sections = childArray.filter(
        child => child.type.displayName === 'Section'
    );
    
    const { activeSection } = useActiveSection(sections);

    return (
        <div className='blog'>
            <aside>
                <h3>Table of Contents</h3>
                <ul>
                    {sections.map(section => (
                        <li
                            className={
                                section.props.anchor === activeSection.props.anchor
                                    ? 'active' : null
                        }>
                            { section.props.title }
                        </li>
                    ))}
                </ul>
            </aside>
            <article>{ children }</article>
        </div>
    );
}


