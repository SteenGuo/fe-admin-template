const mixins = {
  methods: {
    tableFormat(row, column, cellValue, index) {
      return cellValue || "—";
    }
  }
};
export default mixins;
