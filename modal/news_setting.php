<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title" id="setting-storage">订阅设置</h4>
</div>
<div class="modal-body">
    <div id="settings" class="row">
        <div class="col-xs-12">
            <div class="checkbox">
                <label>
                    <input id="cbReceiveTime" type="checkbox"> &nbsp;&nbsp;接收时间
                </label>
            </div>
            <p class="text-muted">选择接收快讯的时间</p>
            <div class="form-group hide" id="receiveBox">
                <label for="startTime" class="col-md-3 control-label">开始时间</label>
                <div class="col-md-9">
                    <select id="startTime" class="form-control"></select>
                </div>
                <label for="endTime" class="col-md-3 control-label">结束时间</label>
                <div class="col-md-9">
                    <select id="endTime" class="form-control"></select>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <hr>
        </div>
        <div class="col-xs-12">
            <div class="checkbox">
                <label>
                    <input id="cbSummary" type="checkbox"> &nbsp;&nbsp;接收摘要
                </label>
            </div>
            <p class="text-muted">在一封电子邮件中囊括所有查询通知</p>
            <div class="form-group hide" id="summaryBox">
                <label for="receiveTimes" class="col-md-3 control-label">接收频次</label>
                <div class="col-md-9">
                    <select id="receiveTimes" class="form-control">
                        <option value="0.5">每半小时一次</option>
                        <option value="1" selected="selected">每小时一次</option>
                        <option value="2">每两小时一次</option>
                        <option value="0">自定义</option>
                    </select>
                </div>
            </div>
            <div class="form-group hide" id="userDefineBox">
                <div class="col-md-9 col-md-offset-3">
                    <input class="form-control" type="number" min="1" max="12" id="userDefineTimes"
                           placeholder="间隔时间(单位:(1-12)小时)">
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal-footer">
    <a class="btn btn-danger" data-dismiss="modal">
        <span>取消</span>
    </a>
    <a class="btn btn-info" id="settingOk">
        <span>确定</span>
    </a>
</div>