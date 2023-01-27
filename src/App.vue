<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Forms" name="0"><FormComponent></FormComponent></el-tab-pane>
      <el-tab-pane label="Auto" name="1"><AutoTable></AutoTable></el-tab-pane>
      <el-tab-pane label="Teleop" name="2"><TeleopTable></TeleopTable></el-tab-pane>
      <el-tab-pane label="Graphs" name="3"><GraphComponent></GraphComponent></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

import FormComponent from './components/FormComponent.vue';
import AutoTable from './components/AutoTable.vue';
import TeleopTable from './components/TeleopTable.vue';
import GraphComponent from './components/GraphComponent.vue';

export default {
  name: 'App',
  components: {
    FormComponent,
    AutoTable,
    TeleopTable,
    GraphComponent
  }
};
</script>