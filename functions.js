
   // 显示最佳路线函数
        function showBestRoutes() {
            // 调用后端接口获取最佳路线信息
            // 这里假设后端返回一个包含最佳路线的数组 bestRoutes，每个路线包括交通方式、距离、预计时间等信息

            var bestRoutes = [
                { mode: "步行", distance: "500m", duration: "10min" },
                { mode: "公交", distance: "600m", duration: "15min" },
                { mode: "骑行", distance: "400m", duration: "8min" }
            ];

            var resultBox = document.getElementById("result-box");
            resultBox.innerHTML = "<h3>最佳路线</h3>";

            // 显示 Top3 最佳路线
            for (var i = 0; i < 3; i++) {
                var route = bestRoutes[i];
                resultBox.innerHTML += "<p>" + route.mode + "：距离 " + route.distance + "，预计时间 " + route.duration + "</p>";
            }
        }

          // 校园车辆管理函数
        function campusVehicleManagement() {
            // 调用后端接口获取校园车辆管理信息
            // 这里假设后端返回停车位情况、乱停车和拥堵情况等信息，并将信息显示在页面上
            var vehicleInfo = "停车位充足，无乱停车现象，交通状况良好。";

            var resultBox = document.getElementById("result-box");
            resultBox.innerHTML = "<h3>校园车辆管理</h3>";
            resultBox.innerHTML += "<p>" + vehicleInfo + "</p>";
        }

        // 显示学校地图信息
        function showCampusMapInfo() {
            // 跳转到学校地图信息页面
            window.location.href = "campus_map_info.html";
        }
