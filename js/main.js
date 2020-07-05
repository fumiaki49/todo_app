$(function () {
  var taskArray = [];
  var storageKey = 'savedTask';

  readStorage();

  $('form').submit( function(e) {
    e.preventDefault();
    var taskData = $('#task').val();
    var deadlineData = $('#deadline').val();
    var priorityData = $('input[name=priority]:checked').val();
    addList(taskData, deadlineData, priorityData);
    saveTask(taskData, deadlineData, priorityData);
  });

  $('.clean-all-task').on('click', function() {
    $('.tasks-list').empty();
    localStorage.clear();
  });

  function saveTask(receivedTask, receivedDeadline, receivedPriority) {
    var taskObject = {
      task: receivedTask, 
      deadline: receivedDeadline,
      priority: receivedPriority
    };
    taskArray.push(taskObject);
    localStorage.setItem(storageKey, JSON.stringify(taskArray));
  };

  function readStorage() {
    var storageData = JSON.parse(localStorage.getItem(storageKey));
    $.each(storageData, function(index, data) {
      addList(data.task, data.deadline, data.priority);
    });
  };
  
  function addList(receivedTask, receivedDeadline, receivedPriority) {
    var taskCardTemplate = `<li class="task-card">
                              <div class="task-name card-inner">${receivedTask}</div>
                              <div class="task-detail card-inner">
                                <div class="task-detail__text-box">
                                  <div class="task-detail__text-box__detail-text">
                                    <p><span class="strong">優先度：</span>${receivedPriority}</p>
                                  </div>
                                  <div class="task-detail__text-box__detail-text">
                                    <p><span class="strong">期限：</span>${receivedDeadline}</p>
                                  </div>
                                </div>
                                <div class="task-detail__btn-box">
                                  <label class="task-detail__btn-box__compleate-btn">
                                    <input type="checkbox">
                                    <span>完了</span>
                                  </label>
                                  <button class="task-detail__btn-box__edit-task default-btn">編集</button>
                                </div>
                              </div>
                            </li>`
    $('.tasks-list').append(taskCardTemplate);
  };
});