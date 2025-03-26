import './style.css';
import {start as startTask1} from './tasks/task1.js';
import {start as startTask2} from './tasks/task2.js';
import {start as startTask3} from './tasks/task3.js';
import {start as startTask4} from './tasks/task4.js';

if (window.location.pathname === '/#/task1') {
  startTask1()
} else if (window.location.pathname === '/#/task2') {
  startTask2()
} else if (window.location.pathname === '/#/task3') {
  startTask3()
} else if (window.location.pathname === '/#/task4') {
  startTask4()
}
