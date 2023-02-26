<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">Team Number</th>
        <th class="text-left">Team Name</th>
        <th class="text-left">Rookie Year</th>
        <th class="text-left">School Name</th>
        <th class="text-left">State/Province</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" :key="item.id">
        <td v-if="tableData.length">{{ item.team_number }}</td>
        <td v-if="tableData.length">{{ item.nickname }}</td>
        <td v-if="tableData.length">{{ item.rookie_year }}</td>
        <td v-if="tableData.length">{{ item.school_name }}</td>
        <td v-if="tableData.length">{{ item.state_prov }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>

let tableData = [];

export default {
  name: "TeamList",
  data() {
    return {
      tableData,
    };
  },
  created() {
    fetch("https://www.thebluealliance.com/api/v3/event/2023mndu2/teams", {
    method: "GET",
    headers: {
      "X-TBA-Auth-Key":
        "9wSxnqP56MMgj6T8SsoQVOprfnX4uGp1YHGq7GLUYv8fmLXk0PYOqEeSR6QRtv3w",
    },
  })
    .then((response) => {
      response.json().then((res) => {
        tableData = res
        return tableData;
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }
};
</script>
