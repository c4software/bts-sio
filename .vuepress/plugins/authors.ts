module.exports = {
    extendsPage: (page) => {
        if (page.data.git && page.data.git.contributors) {
            page.data.git.contributors = page.data.git.contributors.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.place === value.place && t.name === value.name
                ))
            )
        }
    },
}