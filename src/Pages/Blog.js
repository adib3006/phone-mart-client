import React from 'react';

const Blog = () => {
    return (
        <div>
            <h1 className='text-5xl font-bold text-center my-14'>Blogs</h1>
            <div className="card w-4/5 mx-auto border rounded-xl shadow-xl mb-10">
                <div className="card-body">
                    <h1 className='text-3xl font-bold mb-5'>What are the different ways to manage a state in a React application?</h1>
                    <p className='font-semibold text-xl'>Local state is perhaps the easiest kind of state to manage in React, considering there are so many tools built into the core React library for managing it. useState is the first tool you should reach for to manage state in your components. It can take accept any valid data value, including primitive and object values. Additionally, its setter function can be passed down to other components as a callback function without needing optimizations like useCallback. Many developers are inclined to use built-in React features like the Context API to manage their state. But it is not recommended. To manage a global state, reach for tried and tested third-party libraries like Zustand, Jotai, and Recoil.</p>
                </div>
            </div>
            <div className="card w-4/5 mx-auto border rounded-xl shadow-xl mb-10">
                <div className="card-body">
                    <h1 className='text-3xl font-bold mb-5'>How does prototypical inheritance work?</h1>
                    <p className='font-semibold text-xl'>prototypical inheritance refers to the ability to access object properties from another object. We use a JavaScript prototype to add new properties and methods to an existing object constructor. We can then essentially tell our JS code to inherit properties from a prototype. Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to another through a reference pointer function.</p>
                </div>
            </div>
            <div className="card w-4/5 mx-auto border rounded-xl shadow-xl mb-10">
                <div className="card-body">
                    <h1 className='text-3xl font-bold mb-5'>What is a unit test? Why should we write unit tests?</h1>
                    <p className='font-semibold text-xl'>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff. The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                </div>
            </div>
            <div className="card w-4/5 mx-auto border rounded-xl shadow-xl mb-10">
                <div className="card-body">
                    <h1 className='text-3xl font-bold mb-5'>React vs. Angular vs. Vue?</h1>
                    <p className='font-semibold text-xl'>In Angular, components are referred to as directives. Directives are just markers on DOM elements, which Angular can track and attach specific behavior too. Therefore, Angular separates the UI part of components as attributes of HTML tags, and their behaviors in the form of JavaScript code. This is what sets it apart when looking at Angular vs React.
                    React, interestingly, combines the UI and behavior of components. In React, the same part of the code is responsible for creating a UI element and dictating its behavior. When looking into Vue vs React, in Vue, UI and behavior are also a part of components, which makes things more intuitive. Also, Vue is highly customizable, which allows you to combine the UI and behavior of components from within a script. Further, you can also use pre-processors in Vue rather than CSS, which is a great functionality. Vue is great when it comes to integration with other libraries, like Bootstrap.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;