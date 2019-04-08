The Caprese App
====================================
Project and Pomodoro Timer...more than just a tomato timer.
------------------------------------
link: https://pacific-harbor-60678.herokuapp.com/

Background:
-----------
The idea for the Caprese app came from my experiments with various pomodoro timer apps while working on the Thinkful 
Flexible Fullstack program.  As I worked through each section I would try to keep track of how much time I spend on 
each unit and compare it to the targeted time.  Ultimately, this proved difficult to do and found myself wishing there 
was an integration between a pomodoro and a project/task timer. The Caprese App is the basic implementation of the 
functionality that I sought.

You can login with this user account to test:<br/> 
username: <em>jstudent</em><br/>
password: <em>1qazxsw23e</em>

Technology:
---------
HTML5, CSS, Javascript, React, Redux, Node, Express, mongoDB

Dashboard
---------
Below is a screenshot of the user's dashboard showing active and completed projects as well as a form for selecting
the pomodoro (work period) and break time lengths. For demonstration purposes the defaults are set to 10 seconds and 
5 seconds, respectively.

![screenshot of the dashboard](Caprese-dashboard.png)

My Projects
------------
Below is a screenshot of the My Projects page.  The project panel (left) lists all of the projects that <em>jstudent</em> has either created 
or cloned. The time panel (right) shows the current project that is selected for work.  Each project shows the budget, remaining time, and status (open or completed).  Next to each project are clock, checkbox, and trashcan icons.  When clicking the clock icon next to a particular
project that project will appear in the timer window.  When the <em>start</em> button is clicked in the timer panel a pomodoro will begin. 
When the pomodoro period ends a modal window will cover the screen for the duration of the breaktime.  Clicking the checkbox icon changes the project status to complete and it will no longer be available for timing.  Clicking the trash can icon deletes the project.
![screenshot of the dashboard](Caprese-my-projects.png)

Project Templates
------------------
The project templates page provides a list of projects that are available to clone.  The templates that are currently in the database are each 
section of Thinkful Frontend Fundamentals. So as an example, a new student could create an account, login, and clone each of the projects (sections) and keep track of how much time they are spending while using a pomodoro timer.
![screenshot of the dashboard](Caprese-project-templates.png)

Backend repo: https://github.com/cymruhangu/caprese-app-back

Possible Future Enhancements
----------------------------
- The addition of tasks or sub-project under a project in which the time budgets from each task would roll up to the parent project. 
- The addition of multi-user functionality which would allow collaboration on projects and tasks.
