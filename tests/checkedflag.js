describe("checkedflag-pattern", function() {
    var pattern;

    requireDependencies(["patterns/checkedflag"], function(cls) {
        pattern = cls;
    });

    beforeEach(function() {
        $("<div/>", {id: "lab"}).appendTo(document.body);
    });

    afterEach(function() {
        $("#lab").remove();
    });

    describe("init", function() {
        it("Set initial state for radio button", function() {
            $("#lab").html([
                "<fieldset>",
                "  <label><input type=\"radio\" name=\"foo\"/></label>",
                "</fieldset>"].join("\n"));
            spyOn(pattern, "onChangeCheckbox");
            spyOn(pattern, "onChangeRadio");
            pattern.init($("#lab input"));
            expect(pattern.onChangeCheckbox).not.toHaveBeenCalled();
            expect(pattern.onChangeRadio).toHaveBeenCalled();

        });

        it("Set initial state for checkbox", function() {
            $("#lab").html([
                "<fieldset>",
                "  <label><input type=\"checkbox\" name=\"foo\"/></label>",
                "</fieldset>"].join("\n"));
            spyOn(pattern, "onChangeCheckbox");
            spyOn(pattern, "onChangeRadio");
            pattern.init($("#lab input"));
            expect(pattern.onChangeCheckbox).toHaveBeenCalled();
            expect(pattern.onChangeRadio).not.toHaveBeenCalled();
        });
    });

    describe("onChangeCheckbox", function() {
        it("Change to checked state", function() {
            $("#lab").html([
                "<fieldset class=\"unchecked\">",
                "  <label class=\"unchecked\"><input type=\"checkbox\" name=\"foo\" checked=\"checked\"/></label>",
                "</fieldset>"].join("\n"));
            var input = $("#lab input")[0];
            pattern.onChangeCheckbox.apply(input, []);
            expect($("#lab label").hasClass("checked")).toBe(true);
            expect($("#lab fieldset").hasClass("checked")).toBe(true);
            expect($("#lab .unchecked").length).toBe(0);
        });

        it("Change to unchecked state", function() {
            $("#lab").html([
                "<fieldset class=\"checked\">",
                "  <label class=\"checked\"><input type=\"checkbox\" name=\"foo\"/></label>",
                "</fieldset>"].join("\n"));
            var input = $("#lab input")[0];
            pattern.onChangeCheckbox.apply(input, []);
            expect($("#lab label").hasClass("unchecked")).toBe(true);
            expect($("#lab fieldset").hasClass("unchecked")).toBe(true);
            expect($("#lab .checked").length).toBe(0);
        });

        it("Fieldset with both checked and unchecked items", function() {
            $("#lab").html([
                "<fieldset>",
                "  <label><input type=\"checkbox\" name=\"foo\"/></label>",
                "  <label><input type=\"checkbox\" name=\"bar\" checked=\"checked\"/></label>",
                "</fieldset>"].join("\n"));
            var input = $("#lab input:checked")[0];
            pattern.onChangeCheckbox.apply(input, []);
            expect($("#lab fieldset").attr("class")).toBe("checked");
            expect($("#lab label").eq(1).attr("class")).toBe("checked");
        });
    });

    describe("onChangeRadio", function() {
        it("Change to checked state", function() {
            $("#lab").html([
                "<fieldset class=\"unchecked\">",
                "  <label class=\"unchecked\"><input type=\"radio\" name=\"foo\" checked=\"checked\"/></label>",
                "</fieldset>"].join("\n"));
            var input = $("#lab input")[0];
            pattern.onChangeCheckbox.apply(input, []);
            expect($("#lab label").hasClass("checked")).toBe(true);
            expect($("#lab fieldset").hasClass("checked")).toBe(true);
            expect($("#lab .unchecked").length).toBe(0);
        });

        it("Change to unchecked state", function() {
            $("#lab").html([
                "<fieldset class=\"checked\">",
                "  <label class=\"checked\"><input type=\"radio\" name=\"foo\"/></label>",
                "</fieldset>"].join("\n"));
            var input = $("#lab input")[0];
            pattern.onChangeCheckbox.apply(input, []);
            expect($("#lab label").hasClass("unchecked")).toBe(true);
            expect($("#lab fieldset").hasClass("unchecked")).toBe(true);
            expect($("#lab .checked").length).toBe(0);
        });

        it("Fieldset with both checked and unchecked items", function() {
            $("#lab").html([
                "<fieldset>",
                "  <label><input type=\"radio\" name=\"foo\"/></label>",
                "  <label><input type=\"radio\" name=\"bar\" checked=\"checked\"/></label>",
                "</fieldset>"].join("\n"));
            var input = $("#lab input:checked")[0];
            pattern.onChangeCheckbox.apply(input, []);
            expect($("#lab fieldset").attr("class")).toBe("checked");
            expect($("#lab label").eq(1).attr("class")).toBe("checked");
        });
    });

    it("Handle form reset", function() {
        $("#lab").html([
            "<form>",
            "  <fieldset class=\"checked\">",
            "    <label class=\"checked\"><input type=\"radio\" id=\"foo\" checked=\"checked\"/></label>",
            "    <label class=\"unchecked\"><input type=\"radio\" id=\"bar\"/></label>",
            "  </fieldset>",
            "</form>"].join("\n"));
        var $input = $("#lab input");
        pattern.init($input);
        $("#foo").prop("checked", false).change();
        $("#bar").prop("checked", "checked").change();
        jasmine.Clock.useMock();
        $input[0].form.reset();
        jasmine.Clock.tick(100);
        expect($("label:has(#foo)").hasClass("checked")).toBe(true);
        expect($("label:has(#bar)").hasClass("unchecked")).toBe(true);
        expect($("#lab fieldset").hasClass("checked")).toBe(true);
    });

});

// jshint indent: 4, browser: true, jquery: true, quotmark: double
// vim: sw=4 expandtab
