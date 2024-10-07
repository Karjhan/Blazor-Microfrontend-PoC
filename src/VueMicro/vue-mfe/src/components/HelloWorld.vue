<template>
  <div class="d-flex flex-column justify-content-center align-items-center p-0">
    <h1 class="mb-4 mt-3">Your Basket</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="d-none d-sm-table-cell">Image</th>
          <th>Toy Name</th>
          <th>Recipient</th>
          <th>Count</th>
          <th>Price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in basketItems" :key="index">
          <td class="d-none d-sm-table-cell">
            <img :src="item.toy.imageUrls[0]" alt="Toy Image" class="img-fluid" width="100" />
          </td>
          <td>{{ item.toy.name }}</td>
          <td>{{ item.recipientName }}</td>
          <td>{{ `${item.count} pcs` }}</td>
          <td>{{ `${item.toy.price * item.count} $` }}</td>
          <td>
            <button @click="deleteItem(item.id)" class="btn btn-danger"><i class="bi bi-trash3"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BasketTable',
  props: {
    basketItems: {
      type: Array,
      required: true
    },
    onDeleteItem: {
      type: Function,
      required: true
    }
  },
  methods: {
    deleteItem(id) {
      this.onDeleteItem(id);
    }
  }
}
</script>