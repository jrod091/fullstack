import React from 'react';

const Header = ({name}) => <h2>{name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => <strong><p>Total of {parts.reduce((s,{exercises}) =>s+exercises,0)} exercises</p></strong>

const Content = ({course}) => {
    const rows = () => course.parts.map(part =>
        <Part
            key={part.id}
            part={part}
        />
    );

    return (
        <>
            <Header name={course.name} />
            {rows()}
            <Total parts={course.parts} />
        </>
    );
}

const Course = ({course}) => {
    const courses = () => course.map(c =>
        <Content
            key={c.id}
            course={c}
        />
    );
    return (
        <div>
            <h1>web development curriculum</h1>
            {courses()}
        </div>
    );
}

export default Course;