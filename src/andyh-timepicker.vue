<template>
  <div>
    <input
      type="text"
      class="form-control"
      v-on:click="openDropdown()"
      :value="this.selectedTime"
    />
    <div class="timedropdown" v-if="this.dropdownOpen">
      <ul class="timeselect hours">
        <li class="helper">HH</li>
        <li
          v-for="(hour, index) in this.hours"
          v-bind:key="index"
          v-bind:class="{ selected: hour == selectedHour }"
          v-on:click="selectHour(hour)"
        >
          {{ hour }}
        </li>
      </ul>
      <ul class="timeselect minutes">
        <li class="helper">MM</li>
        <li
          v-for="(min, index) in this.mins"
          v-bind:key="index"
          v-bind:class="{ selected: min == selectedMin }"
          v-on:click="selectMin(min)"
        >
          {{ min }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "00:00",
      required: true
    },
    minInterval: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dropdownOpen: false,
      hours: [],
      mins: [],
      selectedHour: this.value.substring(0, 2),
      selectedMin: this.value.substring(3, 5)
    };
  },
  computed: {
    selectedTime: function() {
      return this.selectedHour + ":" + this.selectedMin;
    }
  },
  mounted() {
    this.calculateHoursList();
    this.calculateMinutesList();
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  watch: {
    value: function() {
      this.selectedHour = this.value.substring(0, 2);
      this.selectedMin = this.value.substring(3, 5);
    }
  },
  methods: {
    calculateHoursList() {
      for (let i = 0; i < 24; i++) {
        this.hours.push(i < 10 ? "0" + i : i);
      }
    },
    calculateMinutesList() {
      for (let i = 0; i < 60; i = i + this.minInterval) {
        this.mins.push(i < 10 ? "0" + i : i);
      }
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.dropdownOpen = false;
      }
    },
    selectHour(h) {
      this.selectedHour = h;
      this.$emit("input", this.selectedTime);
    },
    selectMin(m) {
      this.selectedMin = m;
      this.$emit("input", this.selectedTime);
    },
    openDropdown() {
      this.dropdownOpen = true;
    }
  }
};
</script>

<style>
.timedropdown {
  position: absolute;
  height: 10em;
  width: 10em;
  display: flex;
  flex-flow: row nowrap;
  background: #fff;
  border: 1px solid #ced4da;
}

.timeselect {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 5em;
  text-align: center;
  cursor: pointer;
}

.helper {
  color: gray;
  cursor: default;
}

.selected {
  background-color: #ffc107;
}
</style>
