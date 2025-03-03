         // 初始化地图
        function initMap() {
            // 创建地图实例
            map = new BMap.Map("map");

            // 设置地图中心点坐标和缩放级别
            var point = new BMap.Point(121.911858, 30.88028);
            map.centerAndZoom(point, 18); // 调整缩放级别以适应你的需求

            // 添加学校名称标注
            var label = new BMap.Label("上海海事大学", { offset: new BMap.Size(20, -10) });
            label.setStyle({ color: "#333", fontWeight: "bold" });
            map.addOverlay(label);

            // 启用滚轮缩放
            map.enableScrollWheelZoom(true);

            // 初始化起点和终点输入框的 Suggestion 功能
            startSuggestion = new BMap.Autocomplete({ input: "start", location: map });
            endSuggestion = new BMap.Autocomplete({ input: "end", location: map });

            // 监听选中提示项事件，当用户选中一个提示项时，就会自动调用该函数
            startSuggestion.addEventListener("onconfirm", function(event) {
                var item = event.item;
                var value = item.value;
                startSuggestion.hide();
            });

            endSuggestion.addEventListener("onconfirm", function(event) {
                var item = event.item;
                var value = item.value;
                endSuggestion.hide();
            });

            // 创建图层对象
            var overlay = new BMap.Overlay();

            // 实现图层的初始化和绘制
            overlay.initialize = function(map) {
                this._map = map;
                var div = document.createElement("div");
                div.style.position = "absolute";
                div.style.top = "60px";
                div.style.right = "20px";
                div.style.width = "auto";
                div.style.height = "auto";
                div.style.backgroundColor = "#fff";
                div.style.padding = "5px";
                div.style.borderRadius = "5px";
                div.innerHTML = "<p>欢迎使用校园导航！</p><p>在起点和终点输入框输入关键字，然后点击搜索按钮，即可打开路线规划结果。</p>";
                map.getPanes().labelPane.appendChild(div);
                return div;
            };

            // 将图层添加到地图中
            map.addOverlay(overlay);
        }


   // 路线规划和显示函数
       function searchRoute() {
  // 获取起点和终点输入框中的内容
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;

  // 获取用户选择的交通方式
  var transportation = document.getElementById("transportation").value;

  // 创建起点和终点的地址解析器
  var startGeo = new BMap.Geocoder();
  var endGeo = new BMap.Geocoder();

  // 将起点和终点地址解析为经纬度
  startGeo.getPoint(start, function (startPoint) {
    if (startPoint) {
      // 创建起点标注
      if (startMarker) {
        map.removeOverlay(startMarker);
      }
      startMarker = new BMap.Marker(startPoint);
      map.addOverlay(startMarker);
      startMarker.setAnimation(BMAP_ANIMATION_BOUNCE); // 添加动画效果

      // 将起点和终点坐标传入路线规划实例
      if (driving) {
        map.removeOverlay(driving);
      }
      // 根据用户选择的交通方式调用不同的路线规划实例
      if (transportation === "driving") {
        driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        driving.setSearchCompleteCallback(function () {
          var distance = driving.getResults().getPlan(0).getDistance(false); // 获取距离，单位：米
          var duration = driving.getResults().getPlan(0).getDuration(false); // 获取预计时间，单位：秒
          // 显示距离和预计时间在页面上
          document.getElementById("distance").innerHTML = "距离：" + distance + "米";
          document.getElementById("duration").innerHTML = "预计时间：" + duration + "秒";
        });
        driving.search(startPoint, endPoint);
      } else if (transportation === "transit") {
        transit = new BMap.TransitRoute(map, { renderOptions: { map: map, autoViewport: true } });
        transit.setSearchCompleteCallback(function () {
          var distance = transit.getResults().getPlan(0).getDistance(false);
          var duration = transit.getResults().getPlan(0).getDuration(false);
          document.getElementById("distance").innerHTML = "距离：" + distance + "米";
          document.getElementById("duration").innerHTML = "预计时间：" + duration + "秒";
        });
        transit.search(startPoint, endPoint);
      } else if (transportation === "walking") {
        walking = new BMap.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        walking.setSearchCompleteCallback(function () {
          var distance = walking.getResults().getPlan(0).getDistance(false);
          var duration = walking.getResults().getPlan(0).getDuration(false);
          document.getElementById("distance").innerHTML = "距离：" + distance + "米";
          document.getElementById("duration").innerHTML = "预计时间：" + duration + "秒";
        });
        walking.search(startPoint, endPoint);
      }

      // 放大地图以适应路线
      map.setZoom(16);
    } else {
      alert("起点地址解析失败，请检查输入内容！");
    }
  });

  endGeo.getPoint(end, function (endPoint) {
    if (endPoint) {
      // 创建终点标注
      if (endMarker) {
        map.removeOverlay(endMarker);
      }
      endMarker = new BMap.Marker(endPoint);
      map.addOverlay(endMarker);
      endMarker.setAnimation(BMAP_ANIMATION_BOUNCE); // 添加动画效果

      // 将起点和终点坐标传入路线规划实例
      if (driving) {
        map.removeOverlay(driving);
      }
      // 根据用户选择的交通方式调用不同的路线规划实例
      if (transportation === "driving") {
        driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        driving.setSearchCompleteCallback(function () {
          var distance = driving.getResults().getPlan(0).getDistance(false); // 获取距离，单位：米
          var duration = driving.getResults().getPlan(0).getDuration(false); // 获取预计时间，单位：秒
          // 显示距离和预计时间在页面上
          document.getElementById("distance").innerHTML = "距离：" + distance + "米";
          document.getElementById("duration").innerHTML = "预计时间：" + duration + "秒";
        });
        driving.search(startPoint, endPoint);
      } else if (transportation === "transit") {
        transit = new BMap.TransitRoute(map, { renderOptions: { map: map, autoViewport: true } });
        transit.setSearchCompleteCallback(function () {
          var distance = transit.getResults().getPlan(0).getDistance(false);
          var duration = transit.getResults().getPlan(0).getDuration(false);
          document.getElementById("distance").innerHTML = "距离：" + distance + "米";
          document.getElementById("duration").innerHTML = "预计时间：" + duration + "秒";
        });
        transit.search(startPoint, endPoint);
      } else if (transportation === "walking") {
        walking = new BMap.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        walking.setSearchCompleteCallback(function () {
          var distance = walking.getResults().getPlan(0).getDistance(false);
          var duration = walking.getResults().getPlan(0).getDuration(false);
          document.getElementById("distance").innerHTML = "距离：" + distance + "米";
          document.getElementById("duration").innerHTML = "预计时间：" + duration + "秒";
        });
        walking.search(startPoint, endPoint);
      }

      // 放大地图以适应路线
      map.setZoom(16);
    } else {
      alert("终点地址解析失败，请检查输入内容！");
    }
  });
}


        // 清空起点和终点输入框、标注和路线
        function clearSearch() {
            document.getElementById("start").value = "";
            document.getElementById("end").value = "";

            if (startMarker) {
                map.removeOverlay(startMarker);
            }
            if (endMarker) {
                map.removeOverlay(endMarker);
            }
            if (driving) {
                map.removeOverlay(driving);
            }

            // 还原地图缩放级别和中心点
            map.setZoom(18);
            map.panTo(new BMap.Point(121.911858, 30.88028));
        }

        // 点击搜索按钮事件
        document.getElementById("search-button").addEventListener("click", function() {
            searchRoute();
        });
